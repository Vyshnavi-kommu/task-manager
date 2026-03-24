const Task = require('../models/Task');

// @desc Create a new task
// @route POST /api/tasks
const createTask = async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a title');
    }

    const task = await Task.create({
        user: req.user._id,
        title,
        description,
        status,
        priority,
        dueDate
    });

    res.status(201).json(task);
};

// @desc Get all tasks (with filter, search, pagination, sort)
// @route GET /api/tasks
const getTasks = async (req, res) => {
    const { status, priority, search, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = { user: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === 'desc' ? -1 : 1;

    const tasks = await Task.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit));

    const totalCount = await Task.countDocuments(query);

    res.json({
        tasks,
        totalCount,
        page: Number(page),
        totalPages: Math.ceil(totalCount / limit)
    });
};

// @desc Get single task
// @route GET /api/tasks/:id
const getTaskById = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (task) {
        res.json(task);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
};

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (task) {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
};

// @desc Delete task
// @route DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (task) {
        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
};

// @desc Get task analytics
// @route GET /api/tasks/analytics
const getAnalytics = async (req, res) => {
    const userId = req.user._id;

    const stats = await Task.aggregate([
        { $match: { user: userId } },
        {
            $facet: {
                totalTasks: [{ $count: 'count' }],
                completedTasks: [
                    { $match: { status: 'Done' } },
                    { $count: 'count' }
                ],
                pendingTasks: [
                    { $match: { status: { $ne: 'Done' } } },
                    { $count: 'count' }
                ],
                byStatus: [
                    { $group: { _id: '$status', count: { $sum: 1 } } }
                ],
                byPriority: [
                    { $group: { _id: '$priority', count: { $sum: 1 } } }
                ]
            }
        }
    ]);

    const result = stats[0];
    const total = result.totalTasks[0]?.count || 0;
    const completed = result.completedTasks[0]?.count || 0;
    const pending = result.pendingTasks[0]?.count || 0;

    res.json({
        totalTasks: total,
        completedTasks: completed,
        pendingTasks: pending,
        completionPercentage: total > 0 ? Number(((completed / total) * 100).toFixed(2)) : 0,
        byStatus: result.byStatus,
        byPriority: result.byPriority
    });
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getAnalytics
};
