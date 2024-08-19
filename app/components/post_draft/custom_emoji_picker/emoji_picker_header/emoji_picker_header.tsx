// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {StyleSheet, View, type LayoutChangeEvent} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import SearchBar, {type SearchProps} from '@app/components/search';
import {setEmojiSkinTone} from '@app/hooks/emoji_category_bar';
import SkinToneSelector from '@app/screens/emoji_picker/picker/header/skintone_selector';

type Props = SearchProps & {
    skinTone: string;
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    row: {
        flexDirection: 'row',
        padding: 8,
    },
});

const EmojiPickerHeader: React.FC<Props> = ({
    skinTone,
    ...props
}) => {
    const containerWidth = useSharedValue(0);
    const isSearching = useSharedValue(false);

    React.useEffect(() => {
        const req = requestAnimationFrame(() => {
            setEmojiSkinTone(skinTone);
        });

        return () => cancelAnimationFrame(req);
    }, [skinTone]);

    const onBlur = React.useCallback(() => {
        isSearching.value = false;
    }, []);

    const onFocus = React.useCallback(() => {
        isSearching.value = true;
    }, []);

    const onLayout = React.useCallback((e: LayoutChangeEvent) => {
        containerWidth.value = e.nativeEvent.layout.width;
    }, []);

    return (
        <View
            onLayout={onLayout}
            style={styles.row}
        >
            <View style={styles.flex}>
                <SearchBar
                    {...props}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </View>
            <SkinToneSelector
                skinTone={skinTone}
                containerWidth={containerWidth}
                isSearching={isSearching}
            />
        </View>
    );
};

export default EmojiPickerHeader;
