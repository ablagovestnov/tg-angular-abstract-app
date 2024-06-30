"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Define MongoDB connection options
// const mongoOptions: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };
// Connect to MongoDB using environment variable
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tg-angular-abstract-mongo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
const Belonging = mongoose_1.default.model('Belonging', new mongoose_1.default.Schema({ name: String }));
// Routes
app.get('/api/belongings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const belongings = yield Belonging.find();
        res.json(belongings);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch belongings' });
    }
}));
app.post('/api/belongings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const belonging = new Belonging(req.body);
        yield belonging.save();
        res.status(201).json(belonging);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create belonging' });
    }
}));
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection', reason);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
