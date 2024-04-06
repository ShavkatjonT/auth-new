const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role, name) => {
	return jwt.sign({ id, email, role, name }, process.env.SECRET_KEY, {
		expiresIn: "60m",
	});
};

class userController {
	async registrationAdmin(req, res, next) {
		const { email, password, name, } = req.body;

		if (!email || !password) {
			return next(ApiError.badRequest("Email yoki parol kiritilmadi!"));
		}

		if (!name) {
			return next(ApiError.badRequest("Name kiritilmadi!"));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(
				ApiError.badRequest(`Ushbu elektron pochta ro'yxattan o'tkazilgan`)
			);
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({
			email,
			password: hashPassword,
			teacher_id,
			role: 'admin',
			name
		});

		const token = generateJwt(user.id, user.email, user.role, name);
		return res.json({ token });
	}

	async registrationTeacher(req, res, next) {
		const { email, password, name, } = req.body;

		if (!email || !password) {
			return next(ApiError.badRequest("Email yoki parol kiritilmadi!"));
		}

		if (!name) {
			return next(ApiError.badRequest("Name kiritilmadi!"));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(
				ApiError.badRequest(`Ushbu elektron pochta ro'yxattan o'tkazilgan`)
			);
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({
			email,
			password: hashPassword,
			teacher_id,
			role: 'teacher',
			name
		});

		const token = generateJwt(user.id, user.email, user.role, name);
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password, name } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequest("Email yoki parol kiritilmadi!"));
		}

		if (!name) {
			return next(ApiError.badRequest("Name kiritilmadi!"));
		}
		const user = await User.findOne({ where: { email, status_main: 'active' } });
		if (!user) {
			return next(ApiError.internal("Bunday foydalanuvchi topilmadi"));
		}

		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return next(ApiError.internal("Parol notogri kiritildi"));
		}

		const token = generateJwt(user.id, user.email, user.role, name);
		return res.json({
			token: token
		});
	}


}


module.exports = new userController();
