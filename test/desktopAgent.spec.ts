import { desktopAgent } from './mockDesktopAgent';
import { expect } from 'chai';
import 'mocha';
import { ResolveIntentResults, ResolveContextResults, AppMetadata } from '../src/interface';

const contact = { id: 'me@asdf.com' };
const company = { name: 'the company', symbol: 'asdf.n' };

describe('DesktopAgent', () => {
  describe('resolve', () => {

    it('should have two resolvers for startChat intent', async () => {
        let theIntent = desktopAgent.newIntent('startChat', contact);
        let result:ResolveIntentResults = await desktopAgent.resolveIntent(theIntent);

        expect(2).to.be.equal(result.targets.length);
        return await desktopAgent.open(result.targets[0], theIntent);
    });

    it('should have two resolutions for company context', async function() {
        const result:ResolveContextResults = await desktopAgent.resolveContext(company);

        expect(1).to.be.equal(result.intents.length);

        const firstIntent = result.intents[0];
        expect('viewChart').to.be.equal(firstIntent.intentName);
        expect(2).to.be.equal(firstIntent.targets.length);

        // this is redundant, usually you'd either call fire or open but for testing purposes ...
        const target:AppMetadata = firstIntent.targets[0];
        const newIntent = desktopAgent.newIntent(firstIntent.intentName.valueOf(), company);
        desktopAgent.raiseIntent(newIntent);
        return desktopAgent.open(target, newIntent);
    });

  });
});