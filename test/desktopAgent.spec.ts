import { desktopAgent } from './mockDesktopAgent';
import { expect } from 'chai';
import 'mocha';
import { ResolveResults, ResolveContextResults } from '../src/interface';

const contact = { id: 'me@asdf.com' };
const company = { name: 'the company', symbol: 'asdf.n' };

describe('DesktopAgent', () => {
  describe('resolve', () => {

    it('should have two resolvers for startChat intent', async () => {
        let theIntent = desktopAgent.newIntent('startChat', contact);
        let result:ResolveResults = await desktopAgent.resolve(theIntent);

        expect(2).to.be.equal(result.targets.length);
        return await desktopAgent.open(result.targets[0], contact);
    });

    it('should have two resolutions for company context', async function() {
        const result:ResolveContextResults = await desktopAgent.resolveContext(company);

        expect(1).to.be.equal(result.intents.length);
        expect('viewChart').to.be.equal(result.intents[0].intentName);
        expect(2).to.be.equal(result.intents[0].targets.length);

        // this is redundant, usually you'd either call fire or open but for testing purposes ...
        let theIntent = desktopAgent.newIntent(result.intents[0].intentName.valueOf(), company);
        desktopAgent.sendIntent(theIntent);
        return desktopAgent.open(result.intents[0].targets[0], company);
    });

  });
});