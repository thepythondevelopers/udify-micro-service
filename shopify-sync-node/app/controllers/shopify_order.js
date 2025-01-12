const Shopify = require('shopify-api-node');
const db = require("../models");
const Integration = db.integration;

const Order = db.order;

const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');
exports.syncOrder =  (req,res) =>{

    const id = req.params.integration_id;
    Integration.findByPk(id)
      .then( async data => {
        if (data) {
          const shopify = new Shopify({
            shopName: data.domain,
            accessToken: data.access_token
          });
            

          //order_data = await shopify.order.list();
          const store_id = data.store_id;
          
          order_data=[];
          let params = { limit: 250 };
          // product_data =  await shopify.product.list(params);
          do {
            const orders = await shopify.order.list(params);
            await Promise.all(orders.map(async (element) => {
              order_data.push(element);
            }))
            
            params = orders.nextPageParameters;
            
          } while (params !== undefined);
          
          Order.destroy({
            where: {
                store_id : store_id
            }
        })
          await Promise.all(order_data.map(async (element) => {
            product_ids = [];
            variant_ids = [];
            Promise.all(element.line_items.map(async (line_item) => {
                product_ids.push(line_item.product_id);
                variant_ids.push(line_item.variant_id);
            }));
            guid = uuidv4();
              guid = guid.replace(/-/g,"");
              
            order_content = {
                guid : guid,
                store_id : store_id,
                created_at : element.created_at,
                updated_at : element.updated_at,
                subtotal : element.subtotal_price,
                total : element.total_price,
                closed_at : element.closed_at,
                shopify_order_id : element.id,
                note : element.note,
                token :element.token,
                gateway : element.gateway,
                total_weight : element.total_weight,
                total_tax : element.total_tax,
                taxes_included : element.taxes_included,
                currency : element.currency,
                financial_status : element.financial_status,
                confirmed : element.confirmed,
                total_discounts : element.total_discounts,
                total_line_items_price : element.total_line_items_price,
                cart_token : element.cart_token,
                name : element.name,
                cancelled_at : element.cancelled_at,
                cancel_reason : element.cancel_reason,
                total_price_usd : element.total_price_usd,
                checkout_token : element.checkout_token,
                processed_at : element.processed_at,
                device_id : element.device_id,
                app_id : element.app_id,
                browser_ip : element.browser_ip,
                fulfillment_status : element.fulfillment_status,
                order_status_url : element.order_status_url,
                customer_id : element.customer.id,
                variant_ids : JSON.stringify(variant_ids),
                product_ids: JSON.stringify(product_ids)
            }	


            Order.create(order_content);

        }));
        return res.json(
            {message:"Order Synced Successfully"});
        }else{
          res.status(401).send({
            message : "Store Not Found."
          });
        }
    }) .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while Syncing."
        });
      });   
}     



