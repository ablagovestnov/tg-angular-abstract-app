import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = '7012022502:AAG6rOFhryq0xE8NKZ5pe0ZN3n5Fsee4grs'
const webAppUrl = 'https://adventure-finder.com/'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать3333! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp('Отправить сообщение', `${webAppUrl}`),
        ])
    )
})
bot.launch()
