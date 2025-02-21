import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Home = () => {
    const [tasks, setTask] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get('https://task-management-system-server-flame.vercel.app/tasks')
            .then(response => {
                setTask(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
                setLoading(false); 
            });
    }, []); 

    let handleDeleteTask = (taskId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://task-management-system-server-flame.vercel.app/tasks/${taskId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'The session has been deleted successfully.',
                                icon: 'success',
                            });
                            setTask(tasks.filter((t) => t._id !== taskId));
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting session:', error);
                    });
            }
        });
    };
    const handleOnDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(source.index, 1);
        reorderedTasks.splice(destination.index, 0, movedTask);
        setTask(reorderedTasks);
    };

    return (
        <div className="pt-20 mb-10">
            <h1 className="text-center text-xl mt-2 md:text-4xl">Tasks</h1>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div
                                className="overflow-x-auto mt-4"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <table className="table text-center">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-center">
                                            <th></th>
                                            <th>Task Title</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task, i) => (
                                            <Draggable key={task._id} draggableId={String(task._id)} index={i}>
                                                {(provided) => (
                                                    <tr
                                                        className="hover text-center hover:text-black"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <th>{i + 1}</th>
                                                        <td>{task.title}</td>
                                                        <td>{task.category}</td>
                                                        <td>{task.description}</td>
                                                        <td className="space-x-2">
                                                            <Link to={`/taskUpdate/${task._id}`} className="btn font-medium bg-green-500 text-white btn-sm">Update</Link>
                                                            <button onClick={() => handleDeleteTask(task._id)} className="btn font-medium bg-red-500 text-white btn-sm">Delete</button>
                                                            <button className="btn font-medium bg-black text-white btn-sm">Reorder</button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                    </tbody>
                                </table>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
};

export default Home;
