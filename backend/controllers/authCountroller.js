import User from '../model/User.js'; // Make sure your folder is named 'models'
import bcrypt from 'bcrypt'

// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare simple string password (if not using hashing yet) or use bcrypt
        // For now, let's assume you stored plain text in the seed, or use this if you hashed it:
        // const isMatch = await bcrypt.compare(password, user.password);
        
        // SIMPLE CHECK (Change this to bcrypt later if needed):
        const isMatch = password === user.password; 

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                tasks: user.tasks
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Register Controller
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create User (For now storing plain password to match your logic, or hash it)
        const user = await User.create({
            name,
            email,
            password, 
            role: role || 'employee'
        });

        res.status(201).json({ success: true, message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const seedUsers = async (req, res) => {
    try {
        const users = req.body; // Expecting an array of users

        if (!Array.isArray(users)) {
            return res.status(400).json({ success: false, message: 'Data must be an array of users' });
        }

        // Clear existing data (Optional: Remove this line if you don't want to delete old data)
        await User.deleteMany({}); 

        // Hash passwords for everyone
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123", salt);

        // Map through users to add the hashed password
        const usersWithHashedPasswords = users.map(user => ({
            ...user,
            password: hashedPassword // Sets password to "123" for everyone
        }));

        // Insert all
        await User.insertMany(usersWithHashedPasswords);

        res.status(201).json({ success: true, message: 'Database Seeded Successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const updateTaskStatus = async (req, res) => {
    try {
        const { employeeId, taskId, status } = req.body;

        const user = await User.findById(employeeId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the specific task in the user's task array
        const task = user.tasks.id(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // UPDATE LOGIC
        if (status === 'accepted') {
            task.newTask = false;
            task.active = true;
        } else if (status === 'completed') {
            task.active = false;
            task.completed = true;
        } else if (status === 'failed') {
            task.active = false;
            task.failed = true;
        }

        await user.save();

        res.status(200).json({ success: true, message: 'Task Updated' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}