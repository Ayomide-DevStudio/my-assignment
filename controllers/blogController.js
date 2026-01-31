const blogDetails =  require('../schemas/blogSchema')

//create CRUD
const postBlog = async (req, res) => {
    try {
        
        const {author, title, content} = req.body
        //validate
        if (!author || !title|| !content) return res.status(400).json({message: "All fields are required!"})
        if (author.length < 3) return res.status(400).json({message: "characters cannot be less than 3"})
        if (content.length < 10) return res.status(400).json({message: "content is too short"})

            //prevent duplicate product
            const wasFound = await blogDetails.findOne({content})
            if (wasFound) return res.status(400).json({message: "Blog already exist❎"})
       
                //proceed to save
                const blog =  new blogDetails({author, title, content})
                await blog.save()
                res.status(200).json({message: `Your blog was successfully posted ✅`})


    } catch (error) {
        res.status(500).json({
            message:  error.message
        })
    }
}


//edit blog post
const editBlog = async (req, res) => {
    try {
        const {id} = req.params
        const {author, title, content} = req.body
            //validate
            if (!author || !title|| !content) return res.status(400).json({message: "All fields are required!"})
            if (author.length < 3) return res.status(400).json({message: "characters cannot be less than 3"})
            if (content.length < 10) return res.status(400).json({message: "content is too short"})
                    //update
                    const blog = await blogDetails.findByIdAndUpdate(id,
                        {author, title, content},
                        {new: true}
                        )
                        if (!blog) return res.status(400).json({message: "Failed to edit blog.....Pls try again"})
                            res.status(200).json({blog, message:"Your blog has been updated successfully ✅"})

        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//getBlogById
const getBlogById =  async (req, res) => {
    try {
        const {id} = req.params
        const blog = await blogDetails.findById(id).select("-createdAt, -updatedAt")
            if (!blog) return res.status(400).json({message: "Blog does not exist"})
                res.status(200).json({blog, message: "Blog found ✅"})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//getAllBlogs

const getAllBlogs = async (req, res) => {
    try {
        const blog =  await blogDetails.find().select("-createdAt, -updatedAt")
            if (!blog) return res.status(400).json({message: "No Blog found😒"})
                 res.status(200).json({blog, message: "Blogs found ✅"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//deleteBlogById

const deleteBlogById = async (req, res) => {
    try {
            const {id} = req.params
            const blog =  await blogDetails.findByIdAndDelete(id)
                if (!blog) return res.status(400).json({message: `Could not delete blog (${id})....it does not exist` })
                    res.status(200).json({message: `Blog with ID: (${id}) has been deleted ✅`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}









module.exports = {
   postBlog,
    editBlog,
    getBlogById,
    getAllBlogs,
    deleteBlogById
}