import { AbilityBuilder, Ability, CollectSubjects, detectSubjectType } from '@casl/ability';
import { Todo } from '../services/todo-storage';

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = CollectSubjects<Todo> | 'all';
export type AppAbility = Ability<[Actions, Subjects]>;

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder<AppAbility>();

  if (role === 'admin') {
    can('manage', 'all');
  } else {
    can(['read', 'create'], 'Todo');
    can(['update', 'delete'], 'Todo', { assignee: 'me' });
  }

  return rules;
}

export function buildAbilityFor(role: string): AppAbility {
  return new Ability<[Actions, Subjects]>(defineRulesFor(role), {
    detectSubjectType(subject) {
      if (subject && typeof subject === 'object' && subject.type) {
        return subject.type;
      }

      return detectSubjectType(subject);
    }
  });
}
