import { Accordion, AccordionItem } from '@nextui-org/react'
import RootIcon from '@/src/components/ui/icons/RootIcon'
import s from './AccordionBlock.module.scss'

const customIndicator = ({ isOpen }) => (
    <RootIcon
        name='arrowLeft'
        className={`${s.indicator} ${
            isOpen ? s['indicator-open'] : s['indicator-close']
        }`}
    />
)

const AccordionBlock = () => (
    <div className={s.wrapper}>
        <Accordion
            variant='splitted'
            defaultExpandedKeys={['1']}
            selectionMode='multiple'
        >
            <AccordionItem
                disableIndicatorAnimation={true}
                indicator={customIndicator}
                key='1'
                aria-label='Доставка'
                title='Доставка'
            >
                Среднее время доставки 21 день. После оплаты вы сможете
                отслеживать статус доставки в профиле
            </AccordionItem>
            <AccordionItem
                disableIndicatorAnimation={true}
                indicator={customIndicator}
                key='2'
                aria-label='Страховка и безопасность'
                title='Страховка и безопасность'
            >
                Даем гарантию, обеспечивающую компенсацию от 30% до 100% в
                случае дефектов или проблем с товаром.
            </AccordionItem>
            <AccordionItem
                disableIndicatorAnimation={true}
                indicator={customIndicator}
                key='3'
                aria-label='Гарантия оригинала'
                title='Гарантия оригинала'
            >
                Все товары проходят проверку POIZON, гарантия качества и
                оригинальности их ключевая политика.
            </AccordionItem>
        </Accordion>
    </div>
)

export default AccordionBlock
