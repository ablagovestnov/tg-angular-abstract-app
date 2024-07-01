import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = process.env.TELEGRAM_SECRET_TOKEN
// const webAppUrl = 'https://adventure-finder.loca.lt'
const webAppUrl = process.env.TELEGRAM_APP_URL


const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp('Открыть', `${webAppUrl}`),
        ])
    )
})
bot.launch()
