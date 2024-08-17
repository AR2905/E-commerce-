const  Order  = require("../model/Order_Model");

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const pageSize = parseInt(req.query._limit, 10) || 10;
    const page = parseInt(req.query._page, 10) || 1;
    
    const orders = await Order.find({ user: id })
                              .skip(pageSize * (page - 1))
                              .limit(pageSize)
                              .exec();
    
    const totalOrders = await Order.countDocuments({ user: id }).exec();

    res.set('X-Total-Count', totalOrders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

  
  exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
      const doc = await order.save();
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.fetchAllOrders = async (req, res) => {
    let query = Order.find({ deleted: { $ne: true } });
    let totalOrdersQuery = Order.find({ deleted: { $ne: true } });
  
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    try {
      // Count documents
      const totalDocs = await totalOrdersQuery.countDocuments().exec();
      
      if (req.query._page && req.query._limit) {
        const pageSize = parseInt(req.query._limit, 10);
        const page = parseInt(req.query._page, 10);
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
      }
  
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  