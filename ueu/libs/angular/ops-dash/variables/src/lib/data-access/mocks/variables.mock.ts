import { Variable } from '../../models/variable.model';
import { VariablesGet } from '../../models/variables-get.model';
import { VariableType } from '../../models/variables-type.model';

export const variablesGetMock = new VariablesGet([], 10);
export const variablesMock = new Variable('mockKey', 'mockValue', VariableType.PLAIN, 'mockId', 1, 'mockCreatedAt');
