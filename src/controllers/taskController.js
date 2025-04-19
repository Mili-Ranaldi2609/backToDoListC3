import taskSchema from "../models/Task.js"
import sprintSchema from "../models/Sprint.js"
export const getTasks = async (req, res) => {
    try {
      const { estado, sort } = req.query;
  
      // Filtro dinámico por estado
      const filter = {};
      if (estado) {
        filter.estado = estado; // Solo filtra por el estado si es que se recibe en la query
      }
      
      // Orden dinámico por fecha límite
      let sortOption = {};
      if (sort === "fechaLimiteAsc") {
        sortOption.fechaLimite = 1; // Ascendente
      } else if (sort === "fechaLimiteDesc") {
        sortOption.fechaLimite = -1; // Descendente
      }
      // Obtener todas las tareas que cumplen con el filtro y el orden especificado
      const tasks = await taskSchema.find(filter).sort(sortOption);
      if (tasks.length === 0) {
        return res.status(404).json({ message: "No se encontraron tareas con los filtros aplicados" });
      }
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
  };
  
// obtener una tarea por id
export const getTaskById = async (req, res) => {
    try {
      const task = await taskSchema.findById(req.params.id); 
  
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la tarea", error: error.message });
    }
  };
//crear una tarea
export const createTask = async (req, res) => {
    const { titulo, descripcion, estado, fechaLimite } = req?.body
    if (!titulo || !descripcion || !estado || !fechaLimite) {
        return res.status(400).json({
            message: 'Los campos son obligatorios'
        })
    }
    const task = new taskSchema({
        titulo,
        descripcion,
        estado,
        fechaLimite
    })
    try {
        const newTask = await task.save()
        console.log(newTask);

        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//actualizar una  tarea
export const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskSchema.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true }
        )
        if (!updatedTask) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      // Buscar la tarea por su ID
      const task = await taskSchema.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
  
      // Verificar si la tarea está asignada a algún sprint
      const sprint = await sprintSchema.findOne({ tareas: taskId });
      if (sprint) {
        return res.status(400).json({ message: "No se puede eliminar una tarea asignada a un Sprint" });
      }
  
      // Eliminar la tarea si no está asignada a ningún sprint
      const deleted = await taskSchema.findByIdAndDelete(taskId);
      if (!deleted) {
        return res.status(404).json({ message: "Error al eliminar la tarea" });
      }

      res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  