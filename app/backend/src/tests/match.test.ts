import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
// import JWT from '../utils/JWT';
// import Validations from '../middlewares/Validations';
import { matches } from '../tests/mocks/MatchMock';
// import * as bcrypt from 'bcrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do MATCH endpoint', () => {
  afterEach(sinon.restore);
  it('Retorna um status 200 e todas as partidas (matches) com sucesso', async function () {
		sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
    const httpResponse = await chai.request(app).get('/matches');
		const { status, body } = httpResponse;
		expect(status).to.equal(200);
		expect(body).to.deep.equal(matches);
  });
});