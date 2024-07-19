import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::employee.employee', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                id: entity.id,
                name: entity.attributes.name,
            }
        });

        return { data: newData };
    },
}));
