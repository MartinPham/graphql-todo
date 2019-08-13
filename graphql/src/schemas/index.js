export default `
  type Query {
    tasks: [Task]
  }

  type Task {
    name: String
  }

  type Mutation {
    addTask(name: String): Boolean
    removeAllTasks: Boolean
  }


  type Subscription {
    taskAdded: Task
    taskReset: Boolean
  }
`;