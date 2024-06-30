import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = '7012022502:AAG6rOFhryq0xE8NKZ5pe0ZN3n5Fsee4grs'
// const webAppUrl = 'https://adventure-finder.loca.lt'
const webAppUrl = 'https://adventure-finder.loca.lt'


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
