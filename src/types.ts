export type TodoType = {
  id: ReturnType<typeof Date.now>;
  text: string;
  isComplete: boolean;
};

export type TodoInputType = Omit<TodoType, "id">;
