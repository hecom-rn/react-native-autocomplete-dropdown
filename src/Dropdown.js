import React, { memo, useMemo, useState, useCallback, useRef } from 'react'
import {StyleSheet, FlatList, View, TouchableOpacity, Image} from 'react-native'

export const Dropdown = memo(
    ({ dataSet, suggestionsListMaxHeight, renderItem, ListEmptyComponent, triangleLeft, disableAutoPositionTriangle, inputCenterX, ...props }) => {
        const [autoLeft, setAutoLeft] = useState(null)
        const containerRef = useRef(null)

        const ItemSeparatorComponent = useMemo(() => {
            return () =>
                props.ItemSeparatorComponent ?? <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
        }, [props.ItemSeparatorComponent])

        const onContainerLayout = useCallback(() => {
            if (disableAutoPositionTriangle) return
            containerRef.current?.measureInWindow((x, y, width) => {
                if (!width) return
                let newLeft
                if (typeof inputCenterX === 'number') {
                    newLeft = Math.round(inputCenterX - x - 6)
                } else {
                    newLeft = Math.round(width / 2 - 6)
                }
                if (newLeft < 0) newLeft = 0
                if (newLeft > width - 12) newLeft = width - 12
                setAutoLeft(newLeft)
            })
        }, [disableAutoPositionTriangle, inputCenterX])

        const dynamicTriangleStyle = useMemo(() => {
            if (typeof triangleLeft === 'number' && !isNaN(triangleLeft)) {
                return { left: triangleLeft }
            }
            if (typeof autoLeft === 'number') {
                return { left: autoLeft }
            }
            return null
        }, [triangleLeft, autoLeft])

        const directionTriangleStyle = useMemo(() => {
            if (props.direction === 'up') {
                return {
                    top: undefined,
                    bottom: -8,
                    borderBottomWidth: 0,
                    borderTopWidth: 8,
                    borderTopColor: '#fff'
                }
            }
            return {}
        }, [props.direction])

        return (
            <View
                ref={containerRef}
                onLayout={onContainerLayout}
                style={{
                    ...styles.listContainer,
                    ...props.suggestionsListContainerStyle
                }}>
                {/* small white triangle (auto-centered; flips when direction='up') */}
                <View style={[styles.triangle, directionTriangleStyle, dynamicTriangleStyle, props.triangleStyle]} />
                <FlatList
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled={true}
                    data={dataSet}
                    style={{ maxHeight: suggestionsListMaxHeight }}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={ListEmptyComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    {...props.flatListProps}
                />
                <TouchableOpacity
                    style={styles.closeIcon}
                    hitSlop={{ top: 3, bottom: 3, left: 3, right: 3 }}
                    onPress={props.onClose}
                    testID={'historyWordClose'}
                >
                    <Image
                        source={require('../image/clear.png')}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
)

const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        borderColor: '#FD6768',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangle: {
        position: 'absolute',
        top: -8,
        left: 16,
        width: 0,
        height: 0,
        zIndex: 10,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff'
        // removed shadow & elevation per request
    },
    container: {},
    listContainer: {
        backgroundColor: '#fff',
        width: '100%',
        zIndex: 9,
        borderRadius: 5,
        shadowColor: '#00000099',
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.3,
        shadowRadius: 15.46,
        elevation: 20,
        position: 'relative'
    }
})
