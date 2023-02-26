import { useState } from 'react';
import styles from './HelpPage.module.scss'

const HelpPage = () => {
  const isAlreadyCorrect = !!localStorage.getItem('protocol')
  const [protocolValue, setProtocolValue] = useState(
    isAlreadyCorrect ?
    'Вопрос верный' : ''
  )
  const [showSecret, setShowSecret] = useState(isAlreadyCorrect)

  const words = ['как', 'работает', 'контрамоция']
  const english = new Set('abcdefghijklmnopqrstuvwxyz')
  const set = new Set(words.join(''))

  function inputChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {

    let k = 0
    const cur = new Set(evt.target.value.toLowerCase())

    for (let el of Array.from(cur)) {
      if (english.has(el)) {
        setProtocolValue(`Вопрос должен быть на русском языке`)
        return
      }
    }

    for (let word of words) {
      if (evt.target.value.toLowerCase().includes(word)) {
        k += 1
      }
    }

    if (k === 1) {
      setProtocolValue(`Вопрос содержит 1 правильное слово`)
    } else if (k === 2) {
      setProtocolValue(`Вопрос содержит ${k} правильных слова`)
    } else if (k === 3) {
      if (evt.target.value.length < words.join('').length + words.length - 1) {
        setProtocolValue('Расставьте пробелы корректно')
      } else {
        setProtocolValue(`Вопрос верный`)
        evt.target.disabled = true
        setShowSecret(true)
        localStorage.setItem('protocol', evt.target.value)
      }
    } else {
      if (evt.target.value) {
        let j = 0
        
        set.forEach(el => {
          if (cur.has(el)) {
            j += 1
          }  
        })
        
        if (j === 1) {
          setProtocolValue(`Вопрос содержит 1 верную букву`)
        } else if (j > 1 && j < 5) {
          setProtocolValue(`Вопрос содержит ${j} верные буквы`)
        } else if (j >= 5) {
          setProtocolValue(`Вопрос содержит ${j} верных букв`)
        } else {
          setProtocolValue(`Впорос неверный`)
        }
      } else {
        setProtocolValue(``)
      }
    }
  }

  return (
    <div className={styles.container}>
      <p>
        Здесь время - это абстракция. Не материя движется со временем, а время идет с движением материи
      </p>
      <p>
        Таким образом, как совокупность любых объектов, так и какая-либо часть пространства могут являться отдельной временной подсистемой
      </p>

      <p>
      <u>Чистая временная подсистема</u> (ЧВП) - такая система, которая за любой период времени, каким бы малым или великим он ни был, приходит в единственное возможное состояние, в то время как состояние <u>стандартной временной подсистемы</u> (СВП) в любой момент времени непредсказуемо
      </p>

      <p>
        <u>Контрамоция</u> - термин братьев Стругацких, обозначающий обратное движение во времени
      </p>

      <p>
        Таким образом, любую ЧВП в отличие от СВП можно однозначно <u>контрамоцировать</u> (обернуть во времени). Устройство, работающее с <u>временными потоками</u>, называется <u>контрамотором</u> и постоянно производит трудные вычисления
      </p>

      <p>
        Контрамоцировать системы рекомендую аккуратно, поскольку если ЧВП взаимодействовала с другими временными подсистемами, то, во-первых, могут возникнуть <u>аномалии</u>, во-вторых, эту ЧВП больше нельзя будет однозначно обернуть во времени
      </p>

      <p>
        Объект, который становится причиной взаимодействия двух или более временных систем, называется <u>межвременным объектом</u>
      </p>

      <p>
        Как оказалось, ЧВП трудно создаваемы, и в целом они не несут никакой практической пользы, как и моя работа в TimeStamp. Именно поэтому я оказался здесь...
      </p>

      <hr />

      <p>
        Объект C-16-O. Занимался разработкой ЧВП в компании TimeStamp, впоследствии был уволен и помещен во временную систему T-16-G, состояющую из совокупности двух небольших ЧВП с <b>десятиминутным</b> жизненным циклом, созданных другим сотрудником по приказу менеджера компании. C-16-O связался с вами и дал доступ к управлению T-16-G через внутренний компьютер. Пытался сбежать самостоятельно, но ничего не вышло...
      </p>

      <p>
        C-16-O по своему протоколу также передал этот макрос
      </p>

      <input 
        type="text"
        name="protocol"
        placeholder='Введите вопрос...'
        defaultValue={localStorage.getItem('protocol') ?? ''}
        disabled={isAlreadyCorrect}
        onChange={inputChangeHandler}
      />

      <p>
        {protocolValue}
      </p>

      {showSecret ?
        <>
          <hr />
          <p>
            В T-16-G контрамоция действует на весь жизненный цикл ЧВП и проигрывает его с конца со сдвигом, равным уже ее прожитому времени
          </p>

          <p>
            Любая временная система может жить в двух направлениях: прямом и обратном. Любое такое напрваление называется временным потоком. У ЧВП их всего два, в то время как у СВП их бесконечное множество, что логично
          </p>

          <p>
            На самом деле, работая в TimeStamp я обнаружил, что, хотя и СВП нельзя однозначно контрамоцировать, есть возоможность контролируемо попасть в необходимый временной поток, причем с любым сдвигом. Тогда я ужаснулся и спрятал свои наработки, поскольку нельзя было, чтобы они попали не в те руки...
          </p>
        </>
        : <div className={styles.empty}></div>
      }

    </div>
  );
};

export default HelpPage;