export class Reference {

    consentReferenceType: string;
    referenceId: string;

    constructor(referenceId: string) {
        this.consentReferenceType = 'CONTRACT_UUID';
        this.referenceId = referenceId;
    }


}
