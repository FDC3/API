import { desktopAgent } from './mockDesktopAgent';
import { expect } from 'chai';
import 'mocha';

const contact = { id: 'me@asdf.com' };
const company = { name: 'the company', symbol: 'asdf.n' };

describe('DesktopAgent', () => {
  describe('resolve', () => {

    it('should have two resolvers for startChat intent', async () => {
        let theIntent = desktopAgent.newIntent('startChat', contact);
        let resolvers = await desktopAgent.resolve(theIntent);

        expect(2).to.be.equal(resolvers.length);
        return await desktopAgent.open(resolvers[0].metaData, contact);
    });

    it('should have two resolutions for company context', async function() {
        const ctxResos = await desktopAgent.resolveContext(company);

        expect(1).to.be.equal(ctxResos.length);
        expect('viewChart').to.be.equal(ctxResos[0].intentName);
        expect(2).to.be.equal(ctxResos[0].targets.length);

        // this is redundant, usually you'd either call fire or open but for testing purposes ...
        let theIntent = desktopAgent.newIntent(ctxResos[0].intentName, company);
        desktopAgent.fire(theIntent);
        return desktopAgent.open(ctxResos[0].targets[0], company);
    });

  });
});