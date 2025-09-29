import React, { memo, useMemo } from 'react'
import {StyleSheet, FlatList, View, TouchableOpacity, Image} from 'react-native'

export const Dropdown = memo(
    ({ dataSet, suggestionsListMaxHeight, renderItem, ListEmptyComponent, ...props }) => {
        const ItemSeparatorComponent = useMemo(() => {
            return () =>
                props.ItemSeparatorComponent ?? <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
        }, [props.ItemSeparatorComponent])

        return (
            <View
                style={{
                    ...styles.listContainer,
                    ...props.suggestionsListContainerStyle
                }}>
                {/* small white triangle on top */}
                <View style={[styles.triangle, props.triangleStyle]} />
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
        top: -8, // lift above the container
        left: 16, // default horizontal offset; can be overridden with triangleStyle
        width: 0,
        height: 0,
        zIndex: 10,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
        // optional shadow to match container (iOS only)
        shadowColor: '#00000099',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        // Android elevation shadow replication
        elevation: 4
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
