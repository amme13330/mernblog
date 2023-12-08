const mongoose = require("mongoose");
const blogModel =require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogsController=async(req,res)=>{
    try{
        const blogs = await blogModel.find({}).populate("user");
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"no blogs found",
            });
        }
        return res.status(200).send({
            success:true,
            blogCount :blogs.length,
            massage :"all blogs data",
            blogs,
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            massage:"error while creating a blog",
            error,
        });
    }
};

exports.createBlogController=async(req,res)=>{
    try{
        const {title,description,image,user}= req.body;
        if(!title||!description||!image||!user){
            return res.status(400).send({
                success:false,
                massage:"fill  all data",
            });
        }
        const exisitingUser = await userModel.findById(user)
        if (!exisitingUser){
            return res.status(404).send({
                success:true,
                massage:"unable to find user",
            });
        };
        const newBlog =new blogModel({title,description,image,user});
        const session =await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        exisitingUser.blogs.push(newBlog)
        await exisitingUser.save({session})
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            massage:"blog created",
            newBlog,
        });

    }catch(error){
            console.log(error);
            return res.status(400).send({
                success:false,
                massage:"error creating blogs",
                error,
            });
    }
};

exports.updateBlogController=async(req,res)=>{
    try{
        const{id}= req.params;
        const {title,description,image} =req.body;
        const blog =await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({
            success:true,
            massage:"blog updated",
            blog,
        });

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            massage:"error while updating",
            error,
        });

    }
};

exports.getBlogByIdController=async(req,res)=>{
    try{
        const {id} =req.params;
        const blog =await blogModel.findById(id);
        if(!blog){
            return res.status(400).send({
                success:false,
                massage:"blog not found with this id",
                blog,
            });

        }
        return res.status(200).send({
            success:true,
            massage:"fetch single blog",
            blog,
        });


    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            massage:"error while getting a single blog",
            error,
        });
    } 
};

exports.deleteBlogController = async(req,res)=>{
    try{ 
        await blogModel.findOneAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            massage:"blog deleted",
        });

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            massage:"error while deleting a blogs",
            error,
        });
    }
};

