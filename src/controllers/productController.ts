import { Request, Response } from "express";
import prisma from "../models/product";

export const registerProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, category, price } = req.body;

  try {
    if (!name) {
      res.status(400).json({
        message: "El nombre es obligatorio",
      });
      return;
    }

    if (!description) {
      res.status(400).json({
        message: "La descripcion es obligatorio",
      });
      return;
    }

    if (!category) {
      res.status(400).json({
        message: "La descripcion es obligatorio",
      });
      return;
    }

    if (price === undefined || price === null || isNaN(price)) {
      res.status(400).json({
        message: "El precio es obligatorio y debe ser un numero",
      });
      return;
    }

    const product = await prisma.create({
      data: {
        name,
        description,
        category,
        price,
      },
    });

    res.status(201).json({
      product,
    });
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.include("name")) {
      res.status(400).json({
        message: "El producto ingresado ya existe",
      });
    }

    res.status(500).json({
      error: "Error in register",
    });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.findMany();
    res.status(201).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, prube mas tarde" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const producId = parseInt(req.params.id);

  try {
    const product = await prisma.findUnique({
      where: {
        id: producId,
      },
    });

    if (!product) {
      res.status(404).json({ error: "El producto no fue encontrado" });
      return;
    }
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, prube mas tarde" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const producId = parseInt(req.params.id);
  const { name, description, category, price } = req.body;

  try {
    let dataToUpdate: any = { ...req.body };

    if (name) dataToUpdate.name = name;
    if (description) dataToUpdate.description = description;
    if (category) dataToUpdate.category = category;
    if (price) dataToUpdate.name = name;

    const product = await prisma.update({
      where: {
        id: producId,
      },
      data: dataToUpdate,
    });

    res.status(201).json(product);
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.include("name")) {
      res.status(400).json({
        message: "El producto ingresado ya existe",
      });
    } else if (error?.code === "P2025") {
      res.status(404).json({
        error: "Producto no encontrado",
      });
    } else {
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarte ",
      });
    }
  }
};


export const deleteProduct = async (req: Request, res: Response):Promise<void> => {
  const producId = parseInt(req.params.id)

  try {
    
    await prisma.delete({
      where: {
        id: producId
      }
    })

    res.status(200).json({
      message: `El producto ${producId} ha sido eliminado `
    }).end()

  } catch (error:any) {
    console.log(error);
    if(error?.code == 'P2025'){
      res.status(404).json({error: 'Producto no encontrado'})
    }else{
      res.status(500).json({error: 'Hubo un error, intentalo mas tarde'})
    }
  }

}
