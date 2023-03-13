import { width } from "@mui/system";
import React, { useState , useEffect} from "react";
import "./todo.css";

export const Todo = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [taskDone, setTaskDone] = useState([]);
  const [removedTasks, setRemovedTasks] = useState(false);
  
  const [selecionados, setSelecionados] = useState(0);
  const [percentageTask, setPercentageTask] = useState(0);
  
//Função para criar um task contendo o valor e emergencia
  const addTask = () => {
    var taskValue = document.getElementById("input").value;
    var newUrgency = selected;

    if (taskValue === "") {
      return;
    }
    if (newUrgency === "") {
      newUrgency = "normalUrgency";
    }

    const newTask = {
      taskValue,
      newUrgency,
    };

    setList((prev) => [...prev, newTask]);
//Checar se o input contêm informação
    if (newTask !== "") {
      document.getElementById("input").value = "";
    }
  };

//useEffect para checar as box toda vez que a lista mudar de tamanho
  useEffect(() => {
    
    checkBox()
    
  }, [list.length])
  
//Checar todas as checkboxes existentes e retornar a quantidade que está marcada
  const checkBox = () => {
    var checkBoxes = document.querySelectorAll(".checkbox")
    setSelecionados(0);
    checkBoxes.forEach(function (el) {
      if (el.checked) {
        setSelecionados((prev) => prev + 1);
      }
    }); 
  };
  

//Função para deletar a task da lista e adiciona-la na lista de tasks removidas
  const deleteTask = (e) => {
    const taskToRemove = e.target.value;
    const indexTaskRemoved = list.findIndex(
      (task) => task.taskValue === taskToRemove
    ); //Acha o index da task com o mesmo valor do card
    const taskRemoved = list[indexTaskRemoved]; //Pega a task removida
    setTaskDone((prev) => [...prev, taskRemoved]); //Adiciona a task removida na lista de tasks completas (precisa adicionar um método de checar se a box estava checkada para depois adicionar na lista de tasks feitas)
    const newArr = [...list];
    newArr.splice(indexTaskRemoved, 1);
    setList(newArr);
  };
//Seta o valor da emergencia
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
//Função para limpar a lista de tasks removidas
  const clearRemovedList = () => {
    setTaskDone([]);
    setRemovedTasks(false);
  };
//Função para mostrar a lista de tasks removidas
  const showRemovedTasks = (e) => {
    if (removedTasks === false) {
      setRemovedTasks(true);
    } else {
      setRemovedTasks(false);
    }
  };

  return (
    <div>
      <div id="inputArea">
        <input
          type="text"
          id="input"
          placeholder="Digite a atividade aqui!"
          autoComplete="off"
        />
        <button type="submit" id="addBtn" onClick={addTask}>
          Add
        </button>
        <select
          name="urgency"
          id="urgency"
          value={selected}
          onChange={handleChange}
        >
          <option value="" disabled={true}>
            --Selecione a urgência--
          </option>
          <option value="noUrgency" className="noUrgency">
            Sem urgência
          </option>
          <option value="normalUrgency">Normal</option>
          <option value="urgency" className="urgency">
            Urgênte
          </option>
        </select>
      </div>

      <div id="list">
        {list.map((item, i) => (
          <div key={i} className={`taskList ${item.newUrgency}`}>
            <input type="checkbox" className="checkbox" onClick={checkBox} />
            <span className="task">{item.taskValue}</span>
            <button id="deleteBtn" value={item.taskValue} onClick={deleteTask} >
              X
            </button>
          </div>
        ))}

      </div>
      {list.length > 0 && (
        <div id="percentageTasks">
          <span>Você completou {Math.round((selecionados / list.length) * 100)}% das tarefas.</span>
          <div id="percentageArea">
            <div id="percentageFiller" style={{width : `${(selecionados / list.length) * 100}%`}}>
              <span id="percentageCompleted">{Math.round((selecionados / list.length) * 100)}%</span>
            </div>
          </div>
        </div>
      )}
      {taskDone.length > 0 && (
        <div id="removedTasksInformation">
          <div id="quantityTasksRemoved">
            <span id="removedTasksLength">{taskDone.length}</span>
            {taskDone.length === 1 && (
              <span id="removedTasksSpan">Afazer removido</span>
            )}
            {taskDone.length > 1 && (
              <span id="removedTasksSpan">Afazeres removidos</span>
            )}
          </div>
          <button id="showRemovedTasks" onClick={showRemovedTasks}>
            +
          </button>
        </div>
      )}
      {removedTasks === true && (
        <div id="areaTasksRemoved">
          <div id="tasksRemoved">
            {taskDone.map((item, i) => (
              <div key={i} className={`taskRemovedList ${item.newUrgency}`}>
                <span className="taskRemoved">{item.taskValue}</span>
              </div>
            ))}
          </div>
          <button id="clearTasksRemoved" onClick={clearRemovedList}>
            Limpar lista
          </button>
        </div>
      )}
    </div>
  );
};
