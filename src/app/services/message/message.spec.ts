import { MessageService } from "./message.service";
describe('message service:', () => {
   it('should add new message', () => {
    let service= new MessageService()
    service.add("new message 1")

    expect(service.messages()).toHaveLength(1)
  });
   it('should clear all messages', () => {
    let service= new MessageService()
    service.add("new message 1")
    service.add("new message 2")

    service.clear()

    expect(service.messages()).toHaveLength(0)
  });
});
