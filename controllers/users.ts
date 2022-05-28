import { Request, Response } from "express"
import User from "../models/user";

export const getUsuarios = (req: Request, res: Response) => {

    User.findAll()
    .then(us => {
        res.json(us);
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

export const getUsuario = (req: Request, res: Response) => {
    
    const { id } = req.params
    
    User.findByPk(id)
    .then(us => {
        if(us){
            res.json(us)
        }
        else{
            res.status(404).json({msg: 'User doesn\'t exists'});
        }
    })
    .catch(error => {
        res.status(500).end();
    })
}

export const postUsuario = (req: Request, res: Response) => {

    const { body } = req;

    // User.create({
    //     name: body.name,
    //     email: body.email,
    //     status: body.status
    // })
    // .then(value => {
    //     res.status(201).json(value);
    // })
    // .catch(error => {
    //     res.status(500).json(error);
    // });

    const nuser = User.build({
        name: body.name,
        email: body.email,
        status: body.status
    });

    nuser.save()
    .then(value => {
        res.status(201).json(value);
    })
    .catch(error => {
        res.status(500).json(error);
    });

}

export const putUsuario = (req: Request, res: Response) => {
    const { id } = req.params;

    const { body } = req;

    User.findByPk(id)
    .then(user => {
        if(user){
            user.update(body)
            .then(result => {
                res.status(200).json(result);
                
            })
            .catch(error => {
                res.status(500).json(error);
            });
        }
        else{
            res.status(404).json({
                msg: "User doesn\'t exists"
            });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });

}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    
    User.findByPk(id)
    .then(user => {
        if(user){
            user.destroy()
            .then(value => {
                res.status(200).json(value);
            })
            .catch(error => {
                res.status(500).json(error);
            })
        }
        else{
            res.status(404).json({msg: "User doesn\'t exists"});
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}

