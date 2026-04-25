export const validateShelterUpdate = (req, res, next) => {
    const { capacity_total, capacity_available } = req.body;
  
    // VERIFICA SE OS CAMPOS EXISTEM
    if (capacity_total == null || capacity_available == null) {
      return res.status(400).json({
        message: 'capacity_total e capacity_available são obrigatórios'
      });
    }
  
    // TIPO NUMÉRICO
    if (typeof capacity_total !== 'number' || typeof capacity_available !== 'number') {
      return res.status(400).json({
        message: 'Os valores devem ser números'
      });
    }
  
    // REGRA DE NEGOCIO
    if (capacity_available > capacity_total) {
      return res.status(400).json({
        message: 'Vagas disponíveis não podem ser maiores que o total'
      });
    }
  
    if (capacity_available < 0) {
      return res.status(400).json({
        message: 'Vagas não podem ser negativas'
      });
    }
  
    // Se OK
    next();
  };