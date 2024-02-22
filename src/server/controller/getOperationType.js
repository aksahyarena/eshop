 const getDataFromCollection = async (collection) => {
    try {
         let data;
         switch (collection) {
              case 'user':
                   data = await userSchemaModel.find({});
                   break;
              case 'editproduct':
                   data = await productSchemaModel.updateOne({_id:id});
                   break;
              case 'fetchproduct':
                   data = await productSchemaModel.find({});
                   break;
              case 'fetchcategories':
                   data = await categorySchemaModel.find({});
                   break;
              default:
                   throw new Error('Invalid collection name');
         }
         return data;
    } catch (error) {
         console.error('Error fetching data:', error);
         throw error;
    }
}
export default getDataFromCollection