// como se fosse o dto do javascript
import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
        id: image.id,
        url: `http://localhost:3333/uploads/${image.path}`,
        };
    },

    renderMany(images: Image[]) {
        // retorna uma lista de orfanatos
        return images.map(image => this.render(image));
    }

};