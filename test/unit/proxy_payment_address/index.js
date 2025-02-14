import tap from './tap';
import transferTickets from './transfer_tickets';

const contractName = 'ProxyPaymentAddress';

export default function () {
	// Before the tests, deploy mocked dependencies and the contract.
	before(async function () {
		// Deploy mock dependency contracts.
		this.terminalV1 = await this.deployMockLocalContractFn('TerminalV1');
		this.terminalDirectory = await this.deployMockLocalContractFn('TerminalDirectory');
		this.ticketBooth = await this.deployMockLocalContractFn('TicketBooth');

		// Deploy the contract.
		this.projectId = 1;
		this.memo = 'some-memo';
		this.contract = await this.deployContractFn(contractName, [
			this.terminalDirectory.address,
			this.ticketBooth.address,
			this.projectId,
			this.memo,
		]);
	});

	// Test each function.
	describe('tap(...)', tap);
	describe('transfer_tickets(...)', transferTickets);
}
