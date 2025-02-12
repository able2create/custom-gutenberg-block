(function (blocks, editor, components, i18n, element) {
    var el = element.createElement;
    var RichText = editor.RichText;
    var MediaUpload = editor.MediaUpload;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var Button = components.Button;

    blocks.registerBlockType('tripolt-25/combo-03', {
        title: i18n.__('3er Combo', 'tripolt_25'),
        icon: 'images-alt2',
        category: 'widgets',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'p'
            },
            images: {
                type: 'array',
                default: [],
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        url: { type: 'string' },
                        alt: { type: 'string' }
                    }
                }
            }
        },
        edit: function (props) {
            var attributes = props.attributes;

            function onChangeContent(newContent) {
                props.setAttributes({ content: newContent });
            }

            function onSelectImages(newImages) {
                var updatedImages = newImages.map(function (image) {
                    return {
                        id: image.id,
                        url: image.url,
                        alt: image.alt
                    };
                });
                if (updatedImages.length > 3) {
                    updatedImages = updatedImages.slice(0, 3);
                }
                props.setAttributes({ images: updatedImages });
            }

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, { title: i18n.__('Images', 'tripolt_25') },
                        el(MediaUpload, {
                            onSelect: onSelectImages,
                            allowedTypes: ['image'],
                            multiple: true,
                            gallery: true,
                            value: attributes.images.map(function (img) { return img.id; }),
                            render: function (obj) {
                                return el(Button, {
                                    onClick: obj.open,
                                    isSecondary: true
                                }, i18n.__('Select Images', 'tripolt_25'));
                            }
                        })
                    )
                ),
                el('div', { className: props.className },
                    el(RichText, {
                        tagName: 'p',
                        onChange: onChangeContent,
                        value: attributes.content,
                        placeholder: i18n.__('Enter your content here...', 'tripolt_25')
                    }),
                    el('div', { className: 'tripolt-25-combo-03-images' },
                        attributes.images.map(function (image) {
                            return el('img', { key: image.id, src: image.url, alt: image.alt });
                        })
                    )
                )
            ];
        },
        save: function (props) {
            var attributes = props.attributes;

            return el('div', { className: 'tripolt-25-combo-03' },
                el(RichText.Content, {
                    tagName: 'p',
                    value: attributes.content
                }),
                el('div', { className: 'tripolt-25-combo-03-images' },
                    attributes.images.map(function (image) {
                        return el('img', { key: image.id, src: image.url, alt: image.alt });
                    })
                )
            );
        }
    });
})(
    window.wp.blocks,
    window.wp.blockEditor || window.wp.editor,
    window.wp.components,
    window.wp.i18n,
    window.wp.element
);