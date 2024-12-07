const Service = require('../models/serviceModel');  // Pastikan model ini sudah ada

// Create a new service
exports.createService = async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? req.file.path : null; // Menangkap path gambar yang diupload

  // Validasi input untuk category
  const validCategories = [
    'penapisan-dokling',
    'penilaian-amdal',
    'pemeriksaan-uklupl',
    'penilaian-delhdplh',
    'registrasi-sppl',
    'amdalnet'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  // Validasi input
  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Title, content, and category are required' });
  }

  try {
    const service = await Service.create({ title, content, image, category });
    res.status(201).json({ message: 'Service created successfully', serviceId: service.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get service by category
exports.getServiceByCategory = async (req, res) => {
  const { category } = req.params; // Mendapatkan kategori dari parameter URL

  try {
    const services = await Service.findAll({ where: { category } });
    if (services.length === 0) {
      return res.status(404).json({ message: 'Service not found for this category' });
    }
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service by category and ID
exports.updateServiceByCategoryAndId = async (req, res) => {
  const { category, id } = req.params; // Mendapatkan kategori dan ID dari parameter URL
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Menangkap path gambar yang diupload

  const validCategories = [
    'penapisan-dokling',
    'penilaian-amdal',
    'pemeriksaan-uklupl',
    'penilaian-delhdplh',
    'registrasi-sppl',
    'amdalnet'
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const service = await Service.findOne({ where: { category, id } });
    if (!service) {
      return res.status(404).json({ message: 'Service not found for this category and ID' });
    }

    // Update data
    service.title = title || service.title;
    service.content = content || service.content;
    if (image) {
      service.image = image;
    }

    await service.save();
    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get service by category and id
exports.getServiceByCategoryAndId = async (req, res) => {
  const { category, id } = req.params; // Mendapatkan kategori dan ID dari parameter URL

  try {
    const service = await Service.findOne({ where: { category, id } });
    if (!service) {
      return res.status(404).json({ message: 'Service not found for this category and ID' });
    }
    res.status(200).json(service); // Mengembalikan data layanan yang ditemukan
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
