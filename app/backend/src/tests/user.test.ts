import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import { validLoginBody, userFromDB, invalidEmailLoginBody, invalidPasswordLoginBody } from './mocks/UserMock';

import * as bcrypt from 'bcrypt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do LOGIN endpoint', () => {
  afterEach(sinon.restore);
  it('Retorna um token de acesso e status 200 para um login com sucesso', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userFromDB as any);
		sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.have.key('token');
		expect(body).to.deep.equal({ token: 'validToken' });
  });
	it('Retorna um erro 400 para um login com dados inválidos', async function () {
		const httpResponse = await chai.request(app).post('/login').send({ email: '', password: '' });
		const { status, body } = httpResponse;
		expect(status).to.equal(400);
		expect(body).to.have.key('message');
		expect(body).to.deep.equal({ message: 'All fields must be filled' });
	});
	it('Retorna um erro 404 para um login com usuário não encontrado (email inválido)', async function () {
		sinon.stub(SequelizeUser, 'findOne').resolves(null);
		const httpResponse = await chai.request(app).post('/login').send(invalidEmailLoginBody);
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 400 para um login com senha incorreta', async function () {
		sinon.stub(SequelizeUser, 'findOne').resolves(userFromDB as any);
		sinon.stub(bcrypt, 'compareSync').returns(false);
		const httpResponse = await chai.request(app).post('/login').send(invalidPasswordLoginBody);
		const { status, body } = httpResponse;
		expect(status).to.equal(401);
		expect(body).to.have.key('message');
	});
	it('Retorna um erro 401 para um email no formato inválido', async function () {
		const httpResponse = await chai.request(app).post('/login').send({...validLoginBody, email: 'email_invalido'});
	});
});