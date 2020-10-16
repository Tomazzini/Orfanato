import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

// Query Paramns: http://localhost:3333/users?search=marcelo
// Route Paramns: http://localhost:3333/users/:id (identificar um recurso)
// body: http://localhost:3333/users

export default {
  // listar todos os orfanatos
  async index( request: Request, response: Response) {
    // instancia o orfanato
    const orphanagesRepository = getRepository(Orphanage);
    // listar
    const orphanages = await orphanagesRepository.find({
     relations: ['images'], // retornar as imagens
    });
    //retorna um objeto json
    return response.json(orphanageView.renderMany(orphanages));
  },

    // buscar apenas um orfanato
    async show(request: Request, response: Response) {
      // instancia o orfanato
      const orphanagesRepository = getRepository(Orphanage);
      // busca o id de dentro do params
      const { id } = request.params;
    // listar
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });
    //retorna um objeto json com apenas um orfanato
    return response.json(orphanageView.render(orphanage));
  },

  //inserir os orfanatos
  async create(request: Request, response: Response) {
    // desestruturar o request.body
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    // manipulando as imagens
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return {
        path: image.filename
      }
    });

    // passando os dados do campo para um objeto
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    // validações de campos obrigatórios
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      })),
    });

    // realiza a validação
    await schema.validate(data, { abortEarly: false });

    // criar o orfanato
    const orphanage = orphanagesRepository.create(data);

    // salva o orfanato no banco de dados
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
};