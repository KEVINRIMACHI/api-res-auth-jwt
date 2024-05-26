import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from "../models/user";
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {

    if(!email){
      res.status(400).json({
        message: 'El email es obligatorio'
      })
      return
    }

    if(!password){
      res.status(400).json({
        message: 'El password es obligatorio'
      })
      return
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);
    res.status(201).json({ token });

  } catch (error:any) {

    

    if(error?.code === 'P2002' && error?.meta?.target?.include('email') ){
      res.status(400).json({
        message: 'El email ingresado ya existe'
      })
    }

    res.status(500).json({
      error: 'Error in register'
    });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    
    if(!email){
      res.status(400).json({
        message: 'El email es obligatorio'
      })
      return
    }

    if(!password){
      res.status(400).json({
        message: 'El password es obligatorio'
      })
      return
    }

    const user = await prisma.findUnique({where: {email}})
    if(!user){
      res.status(404).json({
        error: 'usuario no encontrado'
      })
      return
    }

    const passwordMatch = await comparePasswords(password, user.password);
    if(!passwordMatch){
      res.status(401).json({
        error: 'Usuario y contrasenia son incorrectos'
      })
    }
    const token = generateToken(user)
    res.status(200).json({token})

  } catch (error) {
    console.log('error: ', error)
  }
}