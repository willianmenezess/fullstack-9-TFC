import { ICRUDModelReader, ICRUDModelCreator } from '../ICRUDModel';
import IMatch, { IMatchInput } from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch>,
  ICRUDModelCreator<IMatch> {
  findByFilterProgress(query: boolean): Promise<IMatch[]>
  finishMatch(id: number): Promise<void>
  updateMatch(id: IMatch['id'], matchInput: IMatchInput): Promise<void>
}
