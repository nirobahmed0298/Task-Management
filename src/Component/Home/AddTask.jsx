import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [timestamp, setTimestamp] = useState('');
    let navigate = useNavigate();
    // This function is called when the form is submitted
    const onSubmit = async (data) => {
        const taskData = {
            ...data,
            timestamp: new Date().toISOString() // Auto-generate timestamp
        };

        console.log(taskData);
        let tasksItem = {
            title: taskData.title,
            description: taskData.description,
            category: taskData.category,
            timestamp: taskData.timestamp,
        }
        let tasks = await axios.post('https://task-management-system-server-flame.vercel.app/tasks', tasksItem)
        if (tasks.data.insertedId) {
            reset()
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Task Added successfully!`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')

        }
    };

    // Set the timestamp on load or form submission
    const setTimestampHandler = () => {
        setValue('timestamp', new Date().toISOString()); // Set the timestamp
    };

    return (
        <div className="max-w-xl mx-auto p-6 pb-5 pt-20 bg-white rounded-none shadow-md dark:bg-black dark:text-white">
            <h2 className="text-2xl font-semibold mb-2 text-center">Create Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        {...register('title', {
                            required: 'Title is required',
                            maxLength: { value: 50, message: 'Title should be less than 50 characters' }
                        })}
                        placeholder="Enter task title"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                    <textarea
                        id="description"
                        {...register('description', {
                            maxLength: { value: 200, message: 'Description should be less than 200 characters' }
                        })}
                        placeholder="Enter task description"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        {...register('category', { required: 'Category is required' })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Category</option>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                {/* Timestamp (auto-generated) */}
                <div>
                    <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Timestamp</label>
                    <input
                        id="timestamp"
                        type="text"
                        value={timestamp}
                        disabled
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                        onClick={setTimestampHandler}
                    />
                    {errors.timestamp && <p className="text-red-500 text-sm">{errors.timestamp.message}</p>}
                </div>

                <button type="submit" className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;