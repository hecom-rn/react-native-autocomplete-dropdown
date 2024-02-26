import React, { memo, useMemo } from 'react'
import {StyleSheet, FlatList, View, Keyboard, TouchableOpacity, Image} from 'react-native'

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

        elevation: 20
    }
})
