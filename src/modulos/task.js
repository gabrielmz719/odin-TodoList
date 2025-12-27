import { v4 as uuidv4 } from 'uuid';

export function taskFactory({
  title,
  description = '',
  dueDate = null,
  priority = 'normal',
  checklist = []
}) {
  return {
    id: uuidv4(),
    title,
    description,
    dueDate,
    priority,
    checklist,
    completed: false
  };
}
