import express from 'express';
import { getShelters, createShelter } from '../controllers/shelterController.js';
import { updateShelter } from '../controllers/shelterController.js';
import { validateShelterUpdate } from '../middlewares/validateShelter.js';
import { deleteShelter } from '../controllers/shelterController.js';
import { updateAvailability } from '../controllers/shelterController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { updateVagas } from '../controllers/shelterController.js';

const router = express.Router();

router.get('/', getShelters);
router.post('/', authMiddleware, createShelter);
router.put('/:id', authMiddleware, validateShelterUpdate, updateShelter);
router.delete('/:id', authMiddleware, deleteShelter);
router.patch('/:id/availability', authMiddleware, updateAvailability);
router.patch('/:id/vagas', updateVagas);

export default router;