export default class Messages {
	MESSAGE_ERROR = {
		REQUIRED_FIELDS:
			'Existe(m) campo(s) obrigatórios que deve(m) ser enviados!',
		INVALID_EMAIL: 'O email informado não é válido!',
		CONTENT_TYPE: 'O cabeçalho da requisição não possui content-type válido!',
		EMPTY_BODY: 'O body da requisição não pode estar vazio!',
		NOT_FOUND_DB: 'Não foram encontrados registros no Banco de Dados',
		INTERNAL_ERROR_DB:
			'Não foi possível realizar a operação com o Banco de Dados',
		REQUIRED_ID: 'O ID do registro é obrigatório neste tipo de requisição',
		INCORRECT_DATE_TYPE: 'O formato da data está errado',
		NO_PET_GENDER_FOUND: 'Este gênero de pet é invalido',
		NO_PET_SIZE_FOUND: 'Este tamanho de pet é invalido',
		NO_PET_SPECIE_FOUND: 'Esta espécie de pet é invalida',
		COULDNT_UPDATE_ITEM: 'Não foi possível atualizar o item',
		TYPES_DOESNT_MATCH: 'Os tipos dos campos não condizem',
		CITY_NOT_FOUND: 'A cidade requisitada não existe no banco de dados',
		STATE_NOT_FOUND: 'O estado requisitado não existe no banco de dados',
	};

	MESSAGE_SUCESS = {
		INSERT_ITEM: 'Item criado com sucesso no Banco de Dados',
		UPDATE_ITEM: 'Item atualizado com sucesso no Banco de Dados',
		DELETE_ITEM: 'Item excluido com sucesso no Banco de Dados',
	};
}