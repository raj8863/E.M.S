import User from '../model/User.js' 

export const createTask = async (req, res) => {
    const { taskTitle, date, assignedTo, category, description } = req.body;

    try {
        const newTask = {
            title: taskTitle,
            date,
            category,
            description,
            active: false,
            newTask: true,
            failed: false,
            completed: false
        }
        
        const user = await User.findOne({ name: assignedTo });
        
        if (!user) {
            return res.status(404).json({ message: "Employee not found" });
        }
        
        user.tasks.push(newTask)
        await user.save();

        res.status(200).json({ success: true, message: "Task Assigned" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'employee' });
        res.status(200).json({ success: true, data: employees })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}