import {
  signalsByName,
  signalsByNumber,
  type Signal,
  type SignalNumber,
  type SignalName,
  type SignalAction,
  type SignalStandard,
} from 'human-signals'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

expectType<Signal>(signalsByName.SIGINT!)
expectType<Signal>(signalsByNumber[1]!)

const { name, number, description, supported, action, forced, standard } =
  signalsByName.SIGINT!
expectType<SignalName>(name)
expectType<SignalNumber>(number)
expectType<string>(description)
expectType<boolean>(supported)
expectType<SignalAction>(action)
expectType<boolean>(forced)
expectType<SignalStandard>(standard)

expectAssignable<SignalName>('SIGINT')
expectNotAssignable<SignalName>(true)
expectNotAssignable<SignalName>('INT')

expectAssignable<SignalNumber>(1)
expectNotAssignable<SignalNumber>('1')

expectAssignable<SignalAction>('terminate')
expectNotAssignable<SignalAction>(true)
expectNotAssignable<SignalAction>('unknown')

expectAssignable<SignalStandard>('ansi')
expectNotAssignable<SignalStandard>(true)
expectNotAssignable<SignalStandard>('unknown')
