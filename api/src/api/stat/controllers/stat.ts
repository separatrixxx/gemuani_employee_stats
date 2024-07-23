import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::stat.stat', ({ strapi }) =>  ({
    async find(ctx) {
        const { data } = await super.find(ctx);

        const newData = data.map(entity => {
            return {
                id: entity.id,
                name: entity.attributes.name,
                action: entity.attributes.action,
                timestamp: entity.attributes.timestamp,
                isGuest: entity.attributes.isGuest,
            }
        });

        return { data: newData };
    },
}));
