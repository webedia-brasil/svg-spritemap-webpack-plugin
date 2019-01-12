module.exports = {
    filterTransferableAttributes: (attributes = []) => {
        return Array.from(attributes).reduce((attributes, attribute) => {
            // Blacklist several attributes as they'll be added/removed while parsing
            if ( ['viewbox', 'width', 'height', 'id', 'xmlns'].includes(attribute.name.toLowerCase()) ) {
                return attributes;
            }

            return [...attributes, {
                name: attribute.name,
                value: attribute.value
            }];
        }, []);
    },

    addXMLNSAttributesToElement: (attributes = [], element) => {
        Array.from(attributes).forEach((attribute) => {
            if ( !attribute.name.toLowerCase().startsWith('xmlns:') ) {
                return;
            }

            if ( element.hasAttribute(attribute.name) ) {
                return;
            }

            element.setAttribute(attribute.name, attribute.value);
        });
    }
};
