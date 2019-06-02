package com.indevstudio.cpnide.server.net;

import com.indevstudio.cpnide.server.model.Declaration;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.ModelFactory;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;

public class ElementFactory {

    public static HLDeclaration createDeclaration(final Declaration declaration)
    {
        HLDeclaration hlDeclaration = ModelFactory.INSTANCE.createHLDeclaration();
        hlDeclaration.setId(declaration.getId());
        DeclarationStructure ds = new DeclarationStructure() {
            @Override
            public String asString() {
                return declaration.getData();
            }

            @Override
            public String asShortString() {
                return declaration.getData();
            }
        };

        hlDeclaration.setStructure(ds);

        return hlDeclaration;
    }
}
