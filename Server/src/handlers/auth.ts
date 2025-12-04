import { Request, Response } from 'express';
import db from '../config/db';
import md5 from 'md5';
import { QueryTypes } from 'sequelize';

export const login = async (req: Request, res: Response) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }
  const hashedPassword = md5(password);

  try {
    const result = await db.query(
      'SELECT * FROM users WHERE usuario = :usuario AND password = :password',
      {
        replacements: { usuario, password: hashedPassword },
        type: QueryTypes.SELECT
      }
    );
    if (Array.isArray(result) && result.length > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error interno' });
  }
};