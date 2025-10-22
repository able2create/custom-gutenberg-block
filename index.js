/**
 * 3er Combo Block
 * Block API Version 3 - Modern WordPress Gutenberg Block
 */
(function () {
    const { registerBlockType } = wp.blocks;
    const { RichText, MediaUpload, InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, Button } = wp.components;
    const { __ } = wp.i18n;
    const { createElement: el } = wp.element;

    registerBlockType('tripolt-25/combo-03', {
        edit: function (props) {
            const { attributes, setAttributes } = props;
            const { content, images } = attributes;

            // Required for Block API v3 - provides iframe compatibility
            const blockProps = useBlockProps();

            function onChangeContent(newContent) {
                setAttributes({ content: newContent });
            }

            function onSelectImages(newImages) {
                const updatedImages = newImages.map(image => ({
                    id: image.id,
                    url: image.url,
                    alt: image.alt || ''
                }));

                // Limit to maximum 3 images
                if (updatedImages.length > 3) {
                    setAttributes({ images: updatedImages.slice(0, 3) });
                } else {
                    setAttributes({ images: updatedImages });
                }
            }

            function removeImage(indexToRemove) {
                const updatedImages = images.filter((img, index) => index !== indexToRemove);
                setAttributes({ images: updatedImages });
            }

            return el('div', {},
                // Inspector Controls (Sidebar)
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, {
                        title: __('Image Settings', 'tripolt-25'),
                        initialOpen: true
                    },
                        el('p', { style: { marginBottom: '10px' } },
                            __('Select up to 3 images for your combo block.', 'tripolt-25')
                        ),
                        el(MediaUpload, {
                            onSelect: onSelectImages,
                            allowedTypes: ['image'],
                            multiple: true,
                            gallery: true,
                            value: images.map(img => img.id),
                            render: function ({ open }) {
                                return el(Button, {
                                    onClick: open,
                                    variant: 'secondary',
                                    icon: 'format-gallery'
                                }, __('Select Images', 'tripolt-25'));
                            }
                        }),
                        images.length > 0 && el('p', {
                            style: { marginTop: '10px', fontSize: '12px', color: '#757575' }
                        },
                            __('Images selected: ', 'tripolt-25') + images.length + ' / 3'
                        )
                    )
                ),

                // Block Content (Editor)
                el('div', blockProps,
                    el(RichText, {
                        tagName: 'p',
                        onChange: onChangeContent,
                        value: content,
                        placeholder: __('Enter your content here...', 'tripolt-25'),
                        className: 'combo-content'
                    }),

                    // Images Display
                    images.length > 0 && el('div', {
                        className: 'tripolt-25-combo-03-images'
                    },
                        images.map((image, index) =>
                            el('div', {
                                key: image.id,
                                className: 'tripolt-25-combo-03-image',
                                style: { position: 'relative', marginBottom: '10px' }
                            },
                                el('img', {
                                    src: image.url,
                                    alt: image.alt
                                }),
                                el(Button, {
                                    onClick: () => removeImage(index),
                                    icon: 'no-alt',
                                    label: __('Remove image', 'tripolt-25'),
                                    style: {
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        minWidth: '30px',
                                        height: '30px'
                                    },
                                    isDestructive: true,
                                    size: 'small'
                                })
                            )
                        )
                    ),

                    // Empty State
                    images.length === 0 && el('p', {
                        className: 'combo-empty-state',
                        style: {
                            padding: '20px',
                            textAlign: 'center',
                            color: '#757575',
                            border: '2px dashed #ddd',
                            borderRadius: '4px',
                            marginTop: '10px'
                        }
                    },
                        __('No images selected. Use the sidebar to add images.', 'tripolt-25')
                    )
                )
            );
        },

        save: function (props) {
            const { attributes } = props;
            const { content, images } = attributes;

            // Required for Block API v3 - preserves block wrapper attributes
            const blockProps = useBlockProps.save();

            return el('div', blockProps,
                el(RichText.Content, {
                    tagName: 'p',
                    value: content,
                    className: 'combo-content'
                }),

                images.length > 0 && el('div', {
                    className: 'tripolt-25-combo-03-images'
                },
                    images.map(image =>
                        el('div', {
                            key: image.id,
                            className: 'tripolt-25-combo-03-image'
                        },
                            el('img', {
                                src: image.url,
                                alt: image.alt
                            })
                        )
                    )
                )
            );
        }
    });
})();
